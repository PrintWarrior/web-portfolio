setInterval(() => {
    const p = document.createElement("div");

    p.innerText = "✦";
    p.style.position = "fixed";
    p.style.left = Math.random() * innerWidth + "px";
    p.style.top = "-20px";
    p.style.opacity = ".6";
    p.style.fontSize = "14px";
    p.style.color = "#D4AF37"; // Gold
    p.style.transition = "2s linear";

    document.body.appendChild(p);

    setTimeout(() => p.style.top = innerHeight + "px", 50);
    setTimeout(() => p.remove(), 2000);
}, 300);