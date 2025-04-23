function commentReviewFunc() {
    const commentStars = document.querySelectorAll(".comment-form-rating .star");
    commentStars.forEach((star) => {
        star.addEventListener("click", (e) => {
            e.preventDefault();
            commentStars.forEach((item) => item.classList.remove("active"));
            star.classList.add("active");
            const starValue = Array.from(commentStars).indexOf(star) + 1;
            localStorage.setItem("stars", starValue);
        });
    });
}

const addNewCommentFunc = () => {
    const commentText = document.getElementById("form-review");
    const commentName = document.getElementById("name");
    const commentButton = document.querySelector(".form-submit input");
    const commentList = document.querySelector(".comment-list");

    // Fungsi untuk merender komentar dari localStorage
    const renderComments = () => {
        const storedComments = JSON.parse(localStorage.getItem("comments") || "[]");
        let result = "";

        storedComments.forEach((item) => {
            let stars = "";
            for (let i = 0; i < item.stars; i++) {
                stars += `<li><i class="bi bi-star-fill"></i></li>`;
            }

            result += `
                <li class="comment-item">
                    <div class="comment-avatar">
                        <img src="img/avatars/avatar1.jpg" alt="">
                    </div>
                    <div class="comment-text">
                        <ul class="comment-stars">${stars}</ul>
                        <div class="comment-meta">
                            <strong>${item.name}</strong>
                            <span>-</span>
                            <time>${item.date}</time>
                        </div>
                        <div class="comment-description">
                            <p>${item.text}</p>
                        </div>
                    </div>
                </li>
            `;
        });

        commentList.innerHTML = result;
    };

    // Render komentar saat pertama kali halaman dimuat
    renderComments();

    commentButton.addEventListener("click", (e) => {
        e.preventDefault();
        const text = commentText.value.trim();
        const name = commentName.value.trim();
        const stars = parseInt(localStorage.getItem("stars") || "0");

        if (!text || !name || !stars) {
            alert("Silakan isi nama, komentar, dan pilih rating bintang.");
            return;
        }

        const dateObj = new Date();
        const formattedDate = `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}/${dateObj.getUTCFullYear()}`;

        const newComment = {
            name: name,
            text: text,
            stars: stars,
            date: formattedDate,
        };

        let comments = JSON.parse(localStorage.getItem("comments") || "[]");
        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));

        // Bersihkan input
        commentText.value = "";
        commentName.value = "";
        localStorage.removeItem("stars");
        document.querySelectorAll(".comment-form-rating .star").forEach((s) => s.classList.remove("active"));

        renderComments();
    });
};

function commentsfunc() {
    commentReviewFunc();
    addNewCommentFunc();
}

export default commentsfunc();
