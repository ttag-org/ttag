function startCount(n){ 
	console.log(`starting count up to ${n}`);
	for (let i = 0; i <= n; i++) { 
		console.log(`${i} ticks passed`); 
	}
}

startCount(3);