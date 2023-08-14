import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/ViewMovie.module.css";

export default function ViewMovie(): JSX.Element {
  const router = useRouter();
  const { imdbID } = router.query; // Retrieve the imdbID from the query parameters
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch movie details using the imdbID
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API}&i=${imdbID}`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  const imdRatingValue = parseFloat(movieDetails.Ratings[0]?.Value);
  const imdWidthValue = (imdRatingValue / 10) * 100;

  const rtWidthValue = movieDetails.Ratings[1]?.Value;
  const metacriticRatingValue = parseInt(movieDetails.Ratings[2]?.Value);
  const metacriticWidthValue = metacriticRatingValue
    ? metacriticRatingValue / 10
    : null;
  console.log(movieDetails.Ratings[2]?.Value);

  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <Image
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          width={500}
          height={650}
        />
        {imdWidthValue && (
          <>
            <div>{movieDetails.Ratings[0]?.Source}</div>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-green-500"
                style={{ width: `${imdWidthValue}%` }}
              ></div>
            </div>
          </>
        )}
        {rtWidthValue && (
          <>
            <div>{movieDetails.Ratings[1]?.Source}ss</div>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-blue-600"
                style={{ width: `${rtWidthValue}` }}
              ></div>
            </div>
          </>
        )}
        {metacriticWidthValue && (
          <>
            <div>{movieDetails.Ratings[2]?.Source}</div>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-yellow-500"
                style={{ width: `${metacriticWidthValue}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      <div className={styles.details}>
        <h2>{movieDetails.Title}</h2>
        <p>
          <strong>Year:</strong> {movieDetails.Year}
        </p>
        <p>
          <strong>Rated:</strong> {movieDetails.Rated}
        </p>
        <p>
          <strong>Released:</strong> {movieDetails.Released}
        </p>
        <p>
          <strong>Runtime:</strong> {movieDetails.Runtime}
        </p>
        <p>
          <strong>Genre:</strong> {movieDetails.Genre}
        </p>
        <p>
          <strong>Language:</strong> {movieDetails.Language}
        </p>
        <p>
          <strong>Director:</strong> {movieDetails.Director}
        </p>
        <p>
          <strong>Writer:</strong> {movieDetails.Writer}
        </p>
        <p>
          <strong>Actors:</strong> {movieDetails.Actors}
        </p>
        <p>
          <strong>Award :</strong> {movieDetails.Awards}
        </p>
        <p>
          <strong>BoxOffice :</strong> {movieDetails.BoxOffice}
        </p>
        <p>
          <strong>Plot:</strong> {movieDetails.Plot}
        </p>
      </div>
    </div>
  );
}
