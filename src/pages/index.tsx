import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Search.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/Ai";

const inter = Inter({ subsets: ["latin"] });

export default function Search(): JSX.Element {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  console.log("Api key", process.env.NEXT_PUBLIC_API);

  const handleSearch = () => {
    console.log("Search icon clicked!");
    console.log("Title", searchValue);
    const API = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API}&s=${searchValue}&page=${currentPage}`;
    console.log("API", API);
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          console.log("Data", data);
          setShowNotFound(false);
          setMovies(data.Search);
          setTotalPages(Math.ceil(Number(data.totalResults) / 10));
        } else {
          setMovies([]);
          setTotalPages(0);
          setShowNotFound(true);
          // router.push("/404"); // Redirect to custom 404 page
        }
      })
      .catch((error) => {
        console.error(error);
        setShowNotFound(true);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      handleSearch();
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleMovieClick = (imdbID: string) => {
    router.push(`/ViewMovie?imdbID=${imdbID}`);
  };

  const renderMovieRows = () => {
    const numMovies = Math.min(movies.length, 8); // Limit the number of movies to 8
    const numRows = Math.ceil(numMovies / 4);
    const rows = [];
    console.log("rowMovies", movies);
    for (let i = 0; i < numRows; i++) {
      const rowStartIndex = i * 4;
      const rowEndIndex = Math.min(rowStartIndex + 4, numMovies);
      const rowMovies = movies.slice(rowStartIndex, rowEndIndex);

      const movieRow = (
        <div className={styles.movieRow} key={i}>
          {rowMovies.map((movie) => (
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
      );

      rows.push(movieRow);
    }

    return rows;
  };
  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchValue}
            onChange={handleChange}
          />
          <div className={styles.searchIcon} onClick={handleSearch}>
            <AiOutlineSearch size={"30px"} />
          </div>
        </div>
        {showNotFound ? (
          <div className={styles.errorContainer}>
            <h1 className={styles.errorMessage}>404 - Movie Not Found</h1>
            <p className={styles.errorDescription}>
              Oops! The movie you are looking for does not found.
            </p>
          </div>
        ) : (
          <div className={styles.moviesContainer}>{renderMovieRows()}</div>
        )}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: 2 }, (_, index) => (
              <button
                key={index}
                className={`${
                  currentPage === index + 1
                    ? styles.activePage
                    : styles.pageButton
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
