function windowResize(b) {
	s = document.querySelector("header").clientHeight
	y = document.querySelector(".pages")
	if (b !== 0) {
		y.style.height = "calc(100% - " + (s + b) + "px)"
	} else {
		y.style.height = ""
	}
}
window.innerWidth < 600 ? windowResize(0) : windowResize(65)
window.onload = function() {
	window.onresize = function() {
		window.innerWidth < 600 ? windowResize(0) : windowResize(65)
		transformFix()
	}
}

currentPage = document.querySelector("section.active")
document.body.style.backgroundColor = currentPage.dataset.bg
document.querySelector("nav ul").style.color = currentPage.dataset.color


function transformFix(load) {
	screenSize = window.innerWidth;
	beforeActiveCount = 0;
	afterActiveCount = 0;
	before = true;
	load === true ? transition = "; transition: 0s;" : transition = "";
	document.querySelectorAll(".pages section").forEach(function(e) {
		if (e.className.includes("active")) {
			screenSize = window.innerWidth
			e.style.cssText = `transform: translateX(0px)`;

			prevElement = e.previousElementSibling;
			while (prevElement !== null && prevElement.nodeName === "SECTION") {
				prevElement.style.cssText = `transform:translateX(-${screenSize}px${transition})`
				prevElement = prevElement.previousElementSibling
				beforeActiveCount++
				screenSize += screenSize
			}

			nextElement = e.nextElementSibling;
			screenSize = window.innerWidth
			while (nextElement !== null && nextElement.nodeName === "SECTION") {
				nextElement.style.cssText = `transform:translateX(${screenSize}px)${transition}`;
				nextElement = nextElement.nextElementSibling;
				afterActiveCount++;
				screenSize += screenSize;
			}
		}
	})
}

transformFix(true)

document.querySelectorAll("header:not(.page header) img, .arrows img").forEach(function(g) {
	if (currentPage.dataset.color === "white") {
		g.style.filter = "";
	} else {
		g.style.filter = "invert(0.9)";
	}

})

if (currentPage.previousElementSibling === null) {
	document.querySelector(".pages img[data-arrow='left']:not(section img)").style.cssText = "opacity: 0.3; cursor: unset;";
} else if (currentPage.nextElementSibling === null || currentPage.nextElementSibling.nodeName !== "SECTION") {
	document.querySelector(".pages img[data-arrow='right']:not(section img)").style.cssText = "opacity: 0.3; cursor: unset;";
}

section = document.querySelectorAll(".pages section")

section[0].querySelector(".arrow:first-child img").style.cssText = "opacity: 0.3; cursor: unset;"
section[section.length - 1].querySelector(".arrow:last-child img").style.cssText = "opacity: 0.3; cursor: unset;"



style = document.createElement("style")
document.body.append(style)

document.querySelectorAll(".arrow img").forEach(function(e) {
	e.onclick = function() {
		currentPage = document.querySelector("section.active")
		document.querySelectorAll("section").forEach(function(a) {
			a.classList.remove("active")
		})
		if (e.dataset.arrow === "left") {
			const prev = currentPage.previousElementSibling
			if (prev !== null && prev.nodeName === "SECTION") {
				document.querySelector(".pages img[data-arrow='right']:not(section img)").style.cssText = "";
				if (prev.previousElementSibling === null) {
					document.querySelector(".pages img[data-arrow='left']:not(section img)").style.cssText = "opacity: 0.3; cursor: unset;";
				}
				const revTextColor = prev.dataset.color === "white" ? "#222" : "#f1f1f1"
				const textColor = prev.dataset.color === "white" ? "#f1f1f1" : "#222"
				document.querySelectorAll("header .logo img, .arrows img, header img").forEach(function(g) {
					if (prev.dataset.color === "white") {
						g.style.filter = "";
					} else {
						g.style.filter = "invert(0.9)";
					}
				})
				document.body.style.backgroundColor = prev.dataset.bg
				document.querySelector("nav ul").style.color = textColor
				prev.classList.add("active")
				prev.style.transform = "translateX(0)"
				document.querySelector("header .group").style.cssText = `background-color : ${textColor}; color: ${revTextColor}`
				style.innerHTML = `li:hover:after {background-color: ${textColor};}`

			} else {
				currentPage.classList.add("active")
				currentPage.style.transform = "translateX(0)"
			}
		} else {
			const next = currentPage.nextElementSibling
			if (next !== null && next.nodeName === "SECTION") {
				document.querySelector(".pages img[data-arrow='left']:not(section img)").style.cssText = "";
				if (next.nextElementSibling === null || next.nextElementSibling.nodeName !== "SECTION") {
					document.querySelector(".pages img[data-arrow='right']:not(section img)").style.cssText = "opacity: 0.3; cursor: unset;";
				}

				const revTextColor = next.dataset.color === "white" ? "#222" : "#f1f1f1"
				const textColor = next.dataset.color === "white" ? "#f1f1f1" : "#222"
				document.querySelectorAll("header img, .arrows img").forEach(function(g) {
					if (next.dataset.color === "white") {
						g.style.filter = "";
					} else {
						g.style.filter = "invert(0.9)";
					}
				})
				document.body.style.backgroundColor = next.dataset.bg
				document.querySelector("nav ul").style.color = textColor
				document.querySelector("header .group").style.cssText = `background-color : ${textColor}; color: ${revTextColor}`
				style.innerHTML = `li:hover:after {background-color: ${textColor};}`
				next.classList.add("active")
				next.style.transform = "translateX(0)"
			} else {
				currentPage.classList.add("active")
				currentPage.style.transform = "translateX(0)"
			}
		}

		transformFix()
	}


})

window.onresize = function() {
	window.onload = function() {
		setTimeout(() => {

			const top = (document.querySelector("section.p1.active").clientHeight - 135) + "px"
			document.querySelector(".arrows").style.cssText = `top: ${top}; opacity: 1;`

		}, 300);
	}
}

document.querySelectorAll("section .first-silde .btn").forEach(function(e) {
	e.onclick = function() {
		document.querySelector(`.page[data-page='${e.offsetParent.dataset.page}']`).classList.add("active")
	}
})


document.querySelectorAll(".page .last-silde .btns .save").forEach(function(e) {
	e.onclick = function() {
		a = e.childNodes[0]
		if (a.className === "RedHeart") {
			a.classList.remove("RedHeart")
		} else {
			a.classList.add("RedHeart")
		}
	};
})

allColors = document.querySelectorAll(".page .last-silde .group-2 .circles .color")

allColors.forEach(function(e) {
	e.onclick = function() {
		allColors.forEach(function(a) {
			a.style.cssText = "";
		})
		color = window.getComputedStyle(e).getPropertyValue("background-color")
		e.style.cssText = `outline: 1px solid ${color};`
	}
})


window.localStorage.setItem("cart", "0")
document.querySelectorAll(".page .last-silde .btns .btn").forEach(function(e) {
	e.onclick = function() {

		window.localStorage.getItem("cart");
		const style = document.createElement("style");
		const count = +window.localStorage.getItem("cart");
		document.body.append(style);
		style.innerHTML = `
    
    header .bs::after{
        content: "${count + 1}";
        transform: scale(1);
    }
    
`
		const btnText = e
		if (btnText.innerHTML === "Remove item") {
			window.localStorage.setItem("cart", count - 1)
			style.innerHTML = `
    
        header .bs::after{
            content: "${count - 1}";
            transform: scale(1);
        }`
			btnText.innerHTML = "Add to Cart"
			if ((count - 1) === 0) {
				style.innerHTML = `
            header .bs::after{
                transform: scale(0);
            }`
			}
		} else {
			btnText.innerHTML = "Remove item"
			window.localStorage.setItem("cart", count + 1)
		}
	}
})


document.querySelectorAll("header .back").forEach(function(e) {
	e.onclick = function() {
		document.querySelectorAll(".page").forEach(function(e) {
			e.classList.remove("active")
		})
	}
})
theSize = document.querySelectorAll(".the-size");
theSizeBtn = document.querySelectorAll(".size dropbtn, .dropbtn, .s");
dropdown = document.querySelectorAll(".dropdown-content");


document.onclick = function() {
	dropdown.forEach(function(e) {
		e.classList.remove("active");
	})
}


theSizeBtn.forEach(function(e) {
	e.onclick = function() {
		setTimeout(() => {
			e.parentElement.querySelector(".dropdown-content").classList.add("active");
		}, 0);
	}
})



document.querySelectorAll(".dropdown-content a").forEach(function(e) {
	e.onclick = function() {
		e.parentElement.parentElement.parentElement.nextElementSibling.innerText = e.innerText
	}
})