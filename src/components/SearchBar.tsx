import { useState } from "react";
import { GENRES } from "../types/movie";

type SearchBarProps = {
  onSearch: (search: string) => void;
  onGenreChange: (genre: string) => void;
};

// =============================================================
// EXERCICE 1 — SearchBar (4 pts)
// =============================================================
//
// Le champ de recherche par texte fonctionne correctement.
// Par contre, le filtre par genre ne fonctionne PAS :
// impossible de changer la sélection.
//
// 1. (1 pt) Identifier le bug sur le filtre genre :
//    pourquoi le <select> ne réagit-il pas ?
//
// 2. (2 pts) Corriger le filtre genre en suivant le même
//    pattern que le champ de recherche (qui fonctionne)
//
// 3. (1 pt) S'assurer que onGenreChange est appelé avec
//    la bonne valeur à chaque changement
//

export const SearchBar = ({ onSearch, onGenreChange }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={search}
        placeholder="Rechercher un film..."
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          onSearch(value);
        }}
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <select
        value={genre}
        onChange={(e) => {
          const value = e.target.value;
          setGenre(value);
          console.log("Genre sélectionné :", value);
          onGenreChange(value);
        }}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Tous les genres</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
};
