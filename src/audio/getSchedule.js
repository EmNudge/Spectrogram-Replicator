// takes keyframes and some options. Spits out (time,value) instead of (x,y)
function getSchedule(nodes) {
	return nodes.map((node) => {
		const xPerc = node.x;
		// invert it since y starts from top
		const yPerc = 1 - node.y;

		return { timePerc: xPerc, value: yPerc };
	});
}

export default getSchedule;
