/**
* "Inspired" by Encoder7Bit.h/Encoder7Bit.cpp in the
* Firmata source code.
*/
module.exports = {
	to7BitArray(data) {
		let shift = 0;
		let previous = 0;
		const output = [];

		data.forEach(byte => {
			if (shift === 0) {
				output.push(byte & 0x7f);
				shift++;
				previous = byte >> 7;
			} else {
				output.push(((byte << shift) & 0x7f) | previous);
				if (shift === 6) {
					output.push(byte >> 1);
					shift = 0;
				} else {
					shift++;
					previous = byte >> (8 - shift);
				}
			}
		});

		if (shift > 0) {
			output.push(previous);
		}

		return output;
	},
	from7BitArray(encoded) {
		const expectedBytes = (encoded.length) * 7 >> 3;
		const decoded = [];

		for (let i = 0; i < expectedBytes; i++) {
			const j = i << 3;
			const pos = parseInt(j / 7, 10);
			const shift = j % 7;
			decoded[i] = (encoded[pos] >> shift) | ((encoded[pos + 1] << (7 - shift)) & 0xFF);
		}

		return decoded;
	},
	toTwo7bitBytes(value) {
		return [value & 0x7F, value >> 7 & 0x7F];
	},
	toFloatAsFour7bitBytes(val) {
		const intVal = Math.floor(val);
		const decimalVal = Math.round((val - intVal) * 100);
		return [val > 0 ? 0 : 1,
			Math.abs(intVal) & 0x7F,
			Math.abs(intVal) >> 7 & 0x7F,
			Math.abs(decimalVal) & 0x7F];
	},
	toFloatAsThree7bitBytes(val) {
		const intVal = Math.floor(val);
		const decimalVal = Math.round((val - intVal) * 100);
		return [
			Math.abs(intVal) & 0x7F,
			Math.abs(intVal) >> 7 & 0x7F,
			Math.abs(decimalVal) & 0x7F];
	},
	toIntegerAsThree7bitBytes(val) {
		const symbol = val > 0 ? 0 : 1;
		return [
			symbol,
			Math.abs(val) & 0x7F,
			Math.abs(val) >> 7 & 0x7F
		];
	}
};
