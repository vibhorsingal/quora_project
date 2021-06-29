$(() => {
    $('#follow').click((e) => {
        const aid = e.target.getAttribute('aid')
        $.get(`/user/profile/follow/${aid}`, (res) => {
            if (res) {
                document.getElementById('follow').innerText = res
            }
            else {
                location.href = '/auth/login'
            }
        })
    })

    $('#askTo').click(() => {
        $('#exampleModal').modal('show')
        $('#main').addClass('blur')
        $('#exampleModal').addClass('open')
    })

})
