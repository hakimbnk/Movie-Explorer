import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={value}
                    onChange={onChange}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    className="search-input"
                />
            </div>
            <button onClick={onSearch} className="search-button">
                Exploration
            </button>
        </div>
    );
};

export default SearchBar;