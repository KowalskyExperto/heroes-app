import { heroes } from "../data/heroes";

export const getHeroesBySuperhero = (superhero = '') => {
    if (superhero === '') {
        return [];
    }
    superhero = superhero.toLocaleLowerCase();
    return heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(superhero))
}