import axios from 'axios';

// Director
export const GetDirectorList = async function (): Promise<Director[]> {
  const res: Director[] = await fetch(
    'http://localhost:8080/api/view/director',
  ).then((data) => data.json());

  return res;
};

export const GetDirector = async function (id: number) : Promise<Director> {
    const res: Director = await fetch(
        'http://localhost:8080/api/view/directory/get/'+id,
      ).then((data) => data.json());
    
    return res;
}

// Movie

export const GetMovieList = async function (): Promise<Movie[]> {
  const res: Movie[] = await fetch(
    'http://localhost:8080/api/view/movies',
  ).then((data) => data.json());

  return res;
};
