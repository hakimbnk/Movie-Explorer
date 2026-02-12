from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# Films populaires
@app.route("/api/movies", methods=["GET"])
def get_movies():
    url = f"{BASE_URL}/movie/popular?api_key={API_KEY}&language=fr-FR&page=1"
    print(f"Fetching movies from: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(f"TMDB Response Status: {response.status_code}")
        print(f"Found {len(data.get('results', []))} movies")
        movies = [
            {
                "id": m["id"],
                "title": m["title"],
                "rating": m["vote_average"],
                "image": f"https://image.tmdb.org/t/p/w300{m['poster_path']}" if m['poster_path'] else ""
            } for m in data.get("results", [])
        ]
        return jsonify(movies)
    except Exception as e:
        print(f"Error fetching movies: {e}")
        return jsonify({"error": str(e)}), 500

# Recherche par titre
@app.route("/api/movies/search", methods=["GET"])
def search_movies():
    query = request.args.get("q", "")
    url = f"{BASE_URL}/search/movie?api_key={API_KEY}&language=fr-FR&query={query}&page=1"
    response = requests.get(url)
    data = response.json()
    results = [
        {
            "id": m["id"],
            "title": m["title"],
            "rating": m["vote_average"],
            "image": f"https://image.tmdb.org/t/p/w300{m['poster_path']}" if m['poster_path'] else ""
        } for m in data.get("results", [])
    ]
    return jsonify(results)

# Détails d'un film (avec trailer)
@app.route("/api/movies/<int:movie_id>", methods=["GET"])
def get_movie_details(movie_id):
    url = f"{BASE_URL}/movie/{movie_id}?api_key={API_KEY}&language=fr-FR&append_to_response=videos"
    print(f"Fetching details for movie {movie_id} from: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        # Trouver le trailer YouTube
        videos = data.get("videos", {}).get("results", [])
        trailer = next((v for v in videos if v["site"] == "YouTube" and v["type"] == "Trailer"), None)
        
        movie_details = {
            "id": data["id"],
            "title": data["title"],
            "overview": data["overview"],
            "release_date": data["release_date"],
            "rating": data["vote_average"],
            "image": f"https://image.tmdb.org/t/p/w500{data['poster_path']}" if data['poster_path'] else "",
            "trailer_url": f"https://www.youtube.com/watch?v={trailer['key']}" if trailer else None
        }
        return jsonify(movie_details)
    except Exception as e:
        print(f"Error fetching movie details: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
