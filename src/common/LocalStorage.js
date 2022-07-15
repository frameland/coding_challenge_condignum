export const LocalStorage = {
	get(key) {
		if (this.isAvailable()) {
			return localStorage.getItem(key);
		}
		return '';
	},

	set(key, value) {
		if (this.isAvailable()) {
			localStorage.setItem(key, value);
		}
	},

	remove(key) {
		if (this.isAvailable()) {
			localStorage.removeItem(key);
		}
	},

	// If the user's browser has strict privacy policy it may not be possible to use localStorage in iframes
	isAvailable() {
		if (isAvailableCached !== undefined) {
			return isAvailableCached;
		}
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			isAvailableCached = true;
			return true;
		} catch (e) {
			isAvailableCached = false;
			return false;
		}
	},
};

let isAvailableCached;
