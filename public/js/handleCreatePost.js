document.getElementById("submitPost").addEventListener("click", async function () {
    const content = document.getElementById("postContent").value.trim();
    const author = document.getElementById("user-name").textContent;

    if (!content) {
        alert("Vui lòng nhập nội dung bài viết!");
        return;
    }

    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "author": author,
            "content": content,
        })
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        alert("Đăng bài thành công!");
        window.location.reload();
        document.getElementById("postContent").value = ""; // Reset ô nhập liệu
    } else {
        alert("Có lỗi xảy ra: " + result.error);
    }
});