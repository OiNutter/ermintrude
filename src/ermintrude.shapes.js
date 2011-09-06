	Ermintrude.theJuggler = function(r, a, t) {	
		return {
			x: Math.sin(r + a), 
			y: Math.tan(Math.exp(Math.log(r)) + a) / (t - 1), 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.figure8 = function(r, a, t) {
		return {
			x: Math.sin(r * 2 + a), 
			y: (Math.sin(r + Math.PI/2 + a) / 8) * t, 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.waterWheel = function(r, a, t) {
		return {
			x: (Math.sin(r + Math.PI/2 + a) / 8) * t, 
			y: Math.sin(r + a) / (Math.PI/2), 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.square = function(r, a, t) {
		var sq_x, sq_y, sq_z;
		
		if (r <= Math.PI/2) {
			sq_x = (2/Math.PI) * r;
			sq_y = -(2/Math.PI) * r + 1;
			sq_z = -(1/Math.PI) * r + 1;
		} else if (r > Math.PI/2 && r <= Math.PI) {
			sq_x = -(2/Math.PI) * r + 2;
			sq_y = -(2/Math.PI) * r + 1;
			sq_z = -(1/Math.PI) * r + 1;
		} else if (r > Math.PI && r <= (3 * Math.PI) / 2) {
			sq_x = -(2/Math.PI) * r + 2;
			sq_y = (2/Math.PI) * r - 3;
			sq_z = (1/Math.PI) * r - 1;
		} else {
			sq_x = (2/Math.PI) * r - 4;
			sq_y = (2/Math.PI) * r - 3;
			sq_z = (1/Math.PI) * r - 1;
		}
		
		return {
			x: sq_x,
			y: sq_y * t, 
			z: sq_z,
			scale: sq_z
		};
	};
	
	Ermintrude.conveyorBeltLeft = function(r, a, t) {
		return {
			x: -Math.cos(r + a), 
			y: (Math.cos(r + 3*Math.PI/2 + a) / 8) * t, 
			z: (Math.sin(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.conveyorBeltRight = function(r, a, t) {
		return {
			x: Math.cos(r + a), 
			y: (Math.cos(r + 3*Math.PI/2 + a) / 8) * t, 
			z: (Math.sin(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.goodbyeCruelWorld = function(r, a, t) {
		return {
			x: Math.sin(r + a), 
			y: (Math.tan(r + 3*Math.PI/2 + a) / 8) * (t + 0.5), 
			z: (Math.sin(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	Ermintrude.diagonalRingLeft = function(r, a, t) {
		return {
			x: Math.sin(r + a), 
			y: -Math.cos(r + Math.tan(Math.cos(a))) / (t + 1.5), 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.diagonalRingRight = function(r, a, t) {
		return {
			x: Math.sin(r + a), 
			y: Math.cos(r + Math.tan(Math.cos(a))) / (t + 1.5), 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.rollerCoaster = function(r, a, t) {
		return {
			x: Math.sin(r + a), 
			y: Math.sin((2 + t) * r), 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};
	
	Ermintrude.tearDrop = function(r, a, t) {
		return {
			x: Math.sin(r + a), 
			y: -Math.sin(r/2 + t) + 0.35, 
			z: (Math.cos(r + a) + 1) / 2,
			scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
		};
	};