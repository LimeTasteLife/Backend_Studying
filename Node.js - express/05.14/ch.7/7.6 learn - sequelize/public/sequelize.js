// 사용자 이름을 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function() {
        const id = el.querySelector('td').textContent;
        getComment(id);
    });
});
// 사용자 로딩
async function getUser() {
    try{
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        const tbody = document.querySelector('')
    }
}