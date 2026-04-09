import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Movie } from "../types/movie";

// =============================================================
// EXERCICE 3 — MovieDetailPage (8 pts)
// =============================================================
//
// Compléter cette page pour afficher le détail d'un film
// et permettre de le marquer comme "vu".
//
// Endpoints :
//   GET  /api/movies/:id               → récupérer le détail du film
//   POST /api/movies/:id/toggle-watched → basculer vu / non vu
//
// 1. (1 pt) Récupérer l'id du film depuis l'URL
//
// 2. (2 pts) Charger les données du film avec useQuery
//
// 3. (1 pt) Afficher les informations du film :
//    titre, image, réalisateur, année, genre, description
//
// 4. (4 pts) Implémenter un bouton pour basculer "vu / non vu" :
//    - Envoyer la requête POST au bon endpoint
//    - Mettre à jour l'affichage après le succès (penser à l'invalidation)
//    - Le texte du bouton doit refléter l'état actuel
//
// Classes CSS suggérées :
//   Container :   "max-w-2xl mx-auto"
//   Image :       "w-full h-64 object-cover rounded-lg"
//   Titre :       "text-3xl font-bold mt-4"
//   Sous-titre :  "text-gray-600 mt-1"
//   Description : "text-gray-700 mt-4"
//   Bouton :      "mt-4 px-4 py-2 rounded-lg text-white"
//                 + (watched ? "bg-gray-500" : "bg-green-600")
//

export const MovieDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get<Movie>(`/movies/${id}`),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement du film.</div>;
  if (!movie) return <div>Film non trouvé.</div>;
  return <div className="max-w-2xl mx-auto">
    <img
      src={movie.imageUrl}
      className="w-full h-64 object-cover rounded-lg"
    />
    <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
    <h2 className="text-gray-600 mt-1">
      {movie.director} - {movie.year} - {movie.genre}
    </h2>
    <p className="text-gray-700 mt-4">{movie.description}</p>
    <button
      className={`mt-4 px-4 py-2 rounded-lg text-white ${
        movie.watched ? "bg-green-600" : "bg-gray-500"
      }`}
      onClick={() => {
        api.post(`/movies/${id}/toggle-watched`).then(() => {
          queryClient.invalidateQueries({ queryKey: ["movie", id] });
        });
      }}
    >
      {movie.watched ? "vu" : "Pas vu"}
    </button>
  </div>;

};
