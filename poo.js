class Bird {
	constructor(
		speed,
		beginDelay,
		heightPosition,
		beatSpeed,
		beatRealismBehaviour,
	) {
		this.speed = speed;
		this.beginDelay = beginDelay;
		this.heightPosition = heightPosition;
		this.beatSpeed = beatSpeed;
		this.beatRealismBehaviour = beatRealismBehaviour;
	}

	//TODO: verified
	createDivElement = () => {
		return document.createElement('div');
	};

	getBirdContainer = () => {
		return document.querySelector('.bird-container');
	};

	getBird = () => {
		return document.querySelector('.bird');
	};

	//TODO: verified
	birdGen = () => {
		const birdContainer = this.createDivElement();
		const bird = this.createDivElement();
		const env = document.getElementById('environment');

		birdContainer.classList.toggle('bird-container');
		birdContainer.classList.toggle('bird-container--shift');
		bird.classList.toggle('bird');
		bird.classList.toggle('bird--beat');
		birdContainer.appendChild(bird);
		env.appendChild(birdContainer);
	};

	//TODO: verified
	setPosition = (heightPosition, beginDelay) => {
		const birdContainer = this.getBirdContainer();
		birdContainer.style.setProperty('--heightPosition', heightPosition + '%'); //position en hauteur de depart varie de 1 a 40 pourcent
		birdContainer.style.setProperty('--beginDelay', beginDelay + 's'); //delai de depart
	};

	//TODO: verified
	setBeat = (beatSpeed, beatRealismBehaviour) => {
		const bird = this.getBird();
		bird.style.setProperty('--beatSpeed', beatSpeed + 's'); //vitesse de battement varie de 0.5 a 1.5 seconde
		bird.style.setProperty(
			'--beatRealismBehaviour',
			beatRealismBehaviour + 's',
		); //comportement du battement varie de 0 a 2,xx seconde
	};

	//TODO: verified
	setSpeed = speed => {
		const birdContainer = this.getBirdContainer();
		birdContainer.style.setProperty('--speed', speed + 's'); //vitesse de deplacement
	};
}

//TODO: verified
randInt = (min, max) => {
	return Math.round(Math.random() * max + min);
};

//TODO: verified
randFloat = (min, max, after) => {
	let randCore = Math.random() * max + min;
	return randCore.toFixed(after);
};

let bird1 = new Bird();

bird1.birdGen();
bird1.setBeat(randFloat(0.5, 1.5, 1), randFloat(0, 2, 2));
bird1.setPosition(randInt(1, 40), 0);
bird1.setSpeed(5);





