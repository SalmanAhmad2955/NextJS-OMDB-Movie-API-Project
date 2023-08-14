import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import styles from "@/styles/Recommend.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import movieTitles from "../services/data/moviesList";

const inter = Inter({ subsets: ["latin"] });

const Recommendations = () => {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const moviesData: any[] = [];
  console.log("Api key", process.env.NEXT_PUBLIC_API);

  const fetchRecommendations = async (movie: string) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API}&t=${movie}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        moviesData.push(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRandomMovie = (movies: string[]) => {
    return movies[Math.floor(Math.random() * movies.length)];
  };
  const getRandomMovies = async () => {
    for (let i = 0; i < 15; i++) {
      await fetchRecommendations(getRandomMovie(movieTitles));
    }

    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // Set expiration to 24 hours from now
    const dataToStore = {
      recommendations: moviesData.slice(0, 8),
      expiration: expirationTime,
    };
    sessionStorage.setItem("movieRecommendations", JSON.stringify(dataToStore));
    setRecommendations(dataToStore.recommendations);
  };

  useEffect(() => {
    const storedRecommendations = sessionStorage.getItem(
      "movieRecommendations"
    );

    if (storedRecommendations) {
      const { recommendations, expiration } = JSON.parse(storedRecommendations);
      if (expiration > Date.now()) {
        setRecommendations(recommendations);
      } else {
        getRandomMovies();
      }
    } else {
      getRandomMovies();
    }

    // Update recommendations after every 24 hours
    const interval = setInterval(() => {
      getRandomMovies();
    }, 24 * 60 * 60 * 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleMovieClick = (imdbID: string) => {
    router.push(`/ViewMovie?imdbID=${imdbID}`);
  };

  return (
    <div className={styles.recommendationsContainer}>
      <h1 className={styles.title}>Recommendations of the Day</h1>
      <div className={styles.moviesContainer}>
        {recommendations.map((movie) => (
          <div className={styles.movieCard} key={movie.imdbID}>
            <a
              className={styles.movieLink}
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <div className={styles.movieThumbnail}>
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={300}
                  height={450}
                />
              </div>
              <div className={styles.movieDetails}>
                <h3>{movie.Title}</h3>
                <h3>{movie.Year}</h3>
              </div>
              <div className={styles.movieDetails}>
                <h3>{movie.Type}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Recommend() {
  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Recommendations />
      </main>
    </>
  );
}
