/* 
BIRDGENERATOR() => (1 bird[object] = 1 bird-container[--shift] + 1 bird[--beat]) 
*/

//generateur d'oiseau
birdGenerator = () => {
	//def birdContainer
	const birdContainer = document.createElement('div');
	birdContainer.classList.toggle('bird-container');
	birdContainer.classList.toggle('bird-container--shift');

	//def bird
	const bird = document.createElement('div');
	bird.classList.toggle('bird');
	bird.classList.toggle('bird--beat');

	//def environment (= background)
	const env = document.getElementById('environment');

	//inject bird to birdContainer and environment
	birdContainer.appendChild(bird);
	env.appendChild(birdContainer);
};

//genere un nombre aleatoire entre min et max arrondisE
quickRandRounded = (min, max) => {
  return Math.round(Math.random() * max + min);
};

//genere un nombre aleatoire entre min et max a N(after) chiffre apres virgule
quickRandFloated = (min, max, after) => {
  let randCore = Math.random() * max + min;
  return randCore.toFixed(after);
}


