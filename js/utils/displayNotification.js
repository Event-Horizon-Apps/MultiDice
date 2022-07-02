let numberOfNotifications = 0;
let topOffset = 50;
function displayNotification(text, bg = "#34db98", fg = "white", duration = 3000) {
	numberOfNotifications++;
	let currentId = numberOfNotifications;
	let notification = document.createElement("div");
	notification.classList.add("notification");
	notification.id = "notification-" + currentId;
	notification.style.backgroundColor = bg;
	notification.style.color = fg;
	notification.style.top = "calc(" + topOffset + "px + " + currentId + "rem)";
	notification.style.right = "-100%";
	notification.innerHTML = text;
	document.body.append(notification);
	setTimeout(() => {
		topOffset += document.getElementById("notification-" + currentId).getBoundingClientRect().height;
		document.getElementById("notification-" + currentId).style.right = "-" + document.getElementById("notification-" + currentId).getBoundingClientRect().width + "px";
		document.getElementById("notification-" + currentId).style.transition = "right 0.3s ease-in-out";
		document.getElementById("notification-" + currentId).classList.add("visible");
	}, 10);
	setTimeout(() => {
		document.getElementById("notification-" + currentId).classList.remove("visible");
		setTimeout(() => {
			topOffset -= document.getElementById("notification-" + currentId).getBoundingClientRect().height;
			document.getElementById("notification-" + currentId).remove();
		}, 300);
	}, duration + 10);
}
