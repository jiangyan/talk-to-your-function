// Car state
const car = {
	x: 300,
	y: 200,
	width: 60,
	height: 30,
	speed: 0,
	maxSpeed: 5,
	direction: 'right',
	moving: false
};

// Hands state
const hands = {
	leftHand: [false, false, false, false, false],  // five fingers, false = down, true = up
	rightHand: [false, false, false, false, false],
	fingerWidth: 20,
	fingerHeight: 80,
	palmSize: 100,
	spacing: 10,
	fingerNames: {
		left: ['thumb', 'index', 'middle', 'ring', 'pinky'],
		right: ['thumb', 'index', 'middle', 'ring', 'pinky']
	}
};

// Initialize canvas and car after DOM loads
document.addEventListener('DOMContentLoaded', () => {
	// Car canvas setup
	const carCanvas = document.getElementById('carCanvas');
	const carCtx = carCanvas.getContext('2d');

	// Hands canvas setup
	const handsCanvas = document.getElementById('handsCanvas');
	const handsCtx = handsCanvas.getContext('2d');

	let animationId = null;

	function drawCar() {
		carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);
		carCtx.save();

		// Translate to car position
		carCtx.translate(car.x, car.y);

		// Rotate based on direction
		const rotations = {
			'right': 0,
			'left': Math.PI,
			'up': -Math.PI/2,
			'down': Math.PI/2
		};
		carCtx.rotate(rotations[car.direction]);

		// Draw car body
		carCtx.fillStyle = '#FF4444';
		carCtx.fillRect(-car.width/2, -car.height/2, car.width, car.height);

		// Draw windows
		carCtx.fillStyle = '#333';
		carCtx.fillRect(-car.width/4, -car.height/2, car.width/2, car.height/3);

		// Draw wheels
		carCtx.fillStyle = '#000';
		carCtx.fillRect(-car.width/2, -car.height/2 - 5, 10, 5);
		carCtx.fillRect(car.width/2 - 10, -car.height/2 - 5, 10, 5);
		carCtx.fillRect(-car.width/2, car.height/2, 10, 5);
		carCtx.fillRect(car.width/2 - 10, car.height/2, 10, 5);

		carCtx.restore();
	}

	function drawHand(ctx, x, y, isLeft, fingers) {
		// Draw palm
		ctx.fillStyle = '#FFB6C1';
		ctx.fillRect(x - hands.palmSize/2, y - hands.palmSize/2, hands.palmSize, hands.palmSize);

		// Calculate finger positions
		const startX = x - ((hands.fingerWidth + hands.spacing) * 2);
		const baseY = y - hands.palmSize/2;

		// Draw fingers
		fingers.forEach((isUp, index) => {
			const fingerX = startX + (index * (hands.fingerWidth + hands.spacing));
			const fingerY = isUp ? baseY - hands.fingerHeight : baseY - hands.fingerHeight/3;

			ctx.fillStyle = '#FFB6C1';
			ctx.fillRect(fingerX, fingerY, hands.fingerWidth, hands.fingerHeight);

			// Draw finger joints
			ctx.fillStyle = '#FF9999';
			ctx.fillRect(fingerX, fingerY + hands.fingerHeight/3, hands.fingerWidth, 2);
			ctx.fillRect(fingerX, fingerY + (hands.fingerHeight * 2/3), hands.fingerWidth, 2);
		});
	}

	function drawHands() {
		handsCtx.clearRect(0, 0, handsCanvas.width, handsCanvas.height);

		// Draw left hand
		drawHand(handsCtx, handsCanvas.width/3, handsCanvas.height/2, true, hands.leftHand);

		// Draw right hand
		drawHand(handsCtx, (handsCanvas.width/3) * 2, handsCanvas.height/2, false, hands.rightHand);
	}

	function updateCarPosition() {
		if (!car.moving) return;

		const movement = {
			'right': () => { car.x += car.speed; },
			'left': () => { car.x -= car.speed; },
			'up': () => { car.y -= car.speed; },
			'down': () => { car.y += car.speed; }
		};

		movement[car.direction]();

		// Check boundaries
		if (car.x < car.width/2) car.x = car.width/2;
		if (car.x > carCanvas.width - car.width/2) car.x = carCanvas.width - car.width/2;
		if (car.y < car.height/2) car.y = car.height/2;
		if (car.y > carCanvas.height - car.height/2) car.y = carCanvas.height - car.height/2;

		document.getElementById('current-speed').textContent = car.speed.toFixed(1);
	}

	function animate() {
		updateCarPosition();
		drawCar();
		drawHands();
		animationId = requestAnimationFrame(animate);
	}

	// Start animation
	animate();

	// Initialize WebRTC connection
	initializeWebRTC();
});

function setSpecificFingers(fingerConfig) {
	// Reset hands first
	hands.leftHand.fill(false);
	hands.rightHand.fill(false);

	// Process left hand
	if (fingerConfig.left) {
		fingerConfig.left.forEach(fingerName => {
			const index = hands.fingerNames.left.indexOf(fingerName.toLowerCase());
			if (index !== -1) {
				hands.leftHand[index] = true;
			}
		});
	}

	// Process right hand
	if (fingerConfig.right) {
		fingerConfig.right.forEach(fingerName => {
			const index = hands.fingerNames.right.indexOf(fingerName.toLowerCase());
			if (index !== -1) {
				hands.rightHand[index] = true;
			}
		});
	}

	// Update result display with total fingers up
	const totalUp = hands.leftHand.filter(f => f).length + hands.rightHand.filter(f => f).length;
	document.getElementById('current-result').textContent = totalUp;

	return totalUp;
}

function interpretFingerCommand(command) {
	const config = {
		left: [],
		right: []
	};

	// Convert command to lowercase for easier matching
	command = command.toLowerCase();

	// Common finger combinations
	if (command.includes('thumb')) {
		if (command.includes('both')) {
			config.left.push('thumb');
			config.right.push('thumb');
		} else {
			if (command.includes('left')) config.left.push('thumb');
			if (command.includes('right')) config.right.push('thumb');
			if (!command.includes('left') && !command.includes('right')) config.left.push('thumb');
		}
	}
	if (command.includes('index')) {
		if (command.includes('both')) {
			config.left.push('index');
			config.right.push('index');
		} else {
			if (command.includes('left')) config.left.push('index');
			if (command.includes('right')) config.right.push('index');
			if (!command.includes('left') && !command.includes('right')) config.left.push('index');
		}
	}
	if (command.includes('middle')) {
		if (command.includes('both')) {
			config.left.push('middle');
			config.right.push('middle');
		} else {
			if (command.includes('left')) config.left.push('middle');
			if (command.includes('right')) config.right.push('middle');
			if (!command.includes('left') && !command.includes('right')) config.left.push('middle');
		}
	}
	if (command.includes('ring')) {
		if (command.includes('both')) {
			config.left.push('ring');
			config.right.push('ring');
		} else {
			if (command.includes('left')) config.left.push('ring');
			if (command.includes('right')) config.right.push('ring');
			if (!command.includes('left') && !command.includes('right')) config.left.push('ring');
		}
	}
	if (command.includes('pinky')) {
		if (command.includes('both')) {
			config.left.push('pinky');
			config.right.push('pinky');
		} else {
			if (command.includes('left')) config.left.push('pinky');
			if (command.includes('right')) config.right.push('pinky');
			if (!command.includes('left') && !command.includes('right')) config.left.push('pinky');
		}
	}

	// Handle numeric input
	const numMatch = command.match(/\d+/);
	if (numMatch) {
		const num = parseInt(numMatch[0]);
		if (num <= 5) {
			// Use left hand for numbers 1-5
			for (let i = 0; i < num; i++) {
				config.left.push(hands.fingerNames.left[i]);
			}
		} else {
			// Fill left hand and use remaining on right
			hands.fingerNames.left.forEach(finger => config.left.push(finger));
			for (let i = 0; i < num - 5; i++) {
				config.right.push(hands.fingerNames.right[i]);
			}
		}
	}

	return config;
}

const fns = {
	moveCar: ({ direction }) => {
		car.direction = direction.toLowerCase();
		car.moving = true;
		return { success: true, direction: car.direction };
	},
	stopCar: () => {
		car.moving = false;
		return { success: true };
	},
	setCarSpeed: ({ speed }) => {
		const newSpeed = parseFloat(speed);
		if (!isNaN(newSpeed) && newSpeed >= 0 && newSpeed <= car.maxSpeed) {
			car.speed = newSpeed;
		}
		return { success: true, speed: car.speed };
	},
	calculateMath: ({ expression }) => {
		try {
			// Only allow simple addition
			const parts = expression.split('+').map(part => parseInt(part.trim()));
			if (parts.length !== 2) throw new Error('Only simple addition is supported');

			const result = parts[0] + parts[1];
			const config = interpretFingerCommand(result.toString());
			setSpecificFingers(config);
			return { success: true, result };
		} catch (error) {
			console.error('Math calculation error:', error);
			return { success: false, error: 'Invalid expression' };
		}
	},
	showGesture: ({ gesture }) => {
		const config = interpretFingerCommand(gesture);
		const totalFingers = setSpecificFingers(config);
		return { success: true, gesture, totalFingers };
	},
	resetHands: () => {
		hands.leftHand.fill(false);
		hands.rightHand.fill(false);
		document.getElementById('current-result').textContent = '0';
		return { success: true, message: "Hands reset" };
	}
};

function initializeWebRTC() {
	// Create a WebRTC Agent
	const peerConnection = new RTCPeerConnection();

	// On inbound audio add to page
	peerConnection.ontrack = (event) => {
		const el = document.createElement('audio');
		el.srcObject = event.streams[0];
		el.autoplay = el.controls = true;
		document.body.appendChild(el);
	};

	const dataChannel = peerConnection.createDataChannel('response');

	function configureData() {
		console.log('Configuring data channel');
		const event = {
			type: 'session.update',
			session: {
				modalities: ['text', 'audio'],
				tools: [
					{
						type: 'function',
						name: 'moveCar',
						description: 'Makes the car move in a specific direction',
						parameters: {
							type: 'object',
							properties: {
								direction: { type: 'string', description: 'The direction to move the car: up, down, left, or right' },
							},
						},
					},
					{
						type: 'function',
						name: 'stopCar',
						description: 'Stops the car from moving',
					},
					{
						type: 'function',
						name: 'setCarSpeed',
						description: 'Sets the speed of the car',
						parameters: {
							type: 'object',
							properties: {
								speed: { type: 'string', description: 'The speed value between 0 and 5' },
							},
						},
					},
					{
						type: 'function',
						name: 'calculateMath',
						description: 'Calculates a simple math expression and shows result with fingers',
						parameters: {
							type: 'object',
							properties: {
								expression: { type: 'string', description: 'A simple math expression like "2 + 3"' },
							},
						},
					},
					{
						type: 'function',
						name: 'showGesture',
						description: 'Shows specific fingers on hands. Can control individual fingers by name (thumb, index, middle, ring, pinky) and specify left or right hand.',
						parameters: {
							type: 'object',
							properties: {
								gesture: { type: 'string', description: 'Description of which fingers to raise, e.g., "left index and right thumb" or "show 7 fingers" or "raise left thumb and index"' },
							},
						},
					},
					{
						type: 'function',
						name: 'resetHands',
						description: 'Resets both hands to initial state with all fingers down',
					},
				],
			},
		};
		dataChannel.send(JSON.stringify(event));
	}

	dataChannel.addEventListener('open', (ev) => {
		console.log('Opening data channel', ev);
		configureData();
	});

	dataChannel.addEventListener('message', async (ev) => {
		const msg = JSON.parse(ev.data);
		// Handle function calls
		if (msg.type === 'response.function_call_arguments.done') {
			const fn = fns[msg.name];
			if (fn !== undefined) {
				console.log(`Calling local function ${msg.name} with ${msg.arguments}`);
				const args = JSON.parse(msg.arguments);
				const result = await fn(args);
				console.log('result', result);
				// Let OpenAI know that the function has been called and share it's output
				const event = {
					type: 'conversation.item.create',
					item: {
						type: 'function_call_output',
						call_id: msg.call_id,
						output: JSON.stringify(result),
					},
				};
				dataChannel.send(JSON.stringify(event));
			}
		}
	});

	// Start WebRTC connection
	navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
		// Add microphone to PeerConnection
		stream.getTracks().forEach((track) => peerConnection.addTransceiver(track, { direction: 'sendrecv' }));

		peerConnection.createOffer().then((offer) => {
			peerConnection.setLocalDescription(offer);

			// Send WebRTC Offer to Workers Realtime WebRTC API Relay
			fetch('/rtc-connect', {
				method: 'POST',
				body: offer.sdp,
				headers: {
					'Content-Type': 'application/sdp',
				},
			})
				.then((r) => r.text())
				.then((answer) => {
					// Accept answer from Realtime WebRTC API
					peerConnection.setRemoteDescription({
						sdp: answer,
						type: 'answer',
					});
				});
		});
	});
}