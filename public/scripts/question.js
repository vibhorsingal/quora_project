$(() => {
    $('#post').click(() => {
        const answerBody = $('.body').val()
        const qid = $('.aid').val()
        $.post(`/question/answer/${qid}`, { ansBody: answerBody }, (res) => {
            new Noty({
                text: 'Answer posted successfully',
                type: 'success',
                layout: 'topCenter',
                theme: 'mint',
                closeWith: ['click', 'button'],
                timeout: 1000
            }).show()
            $('.ul').prepend(`
            <li>
            <div class="card answerWrapper">
                        <h6><img src="${res.userId.avatar}" alt="alt"
                                style="height: 30px; width: 30px; border-radius: 50%;"><a
                                href="/user/profile/${res.userId.id}">
                                ${res.userId.name}
                            </a></h6>
                        <p class="otherAnswers">
                            ${res.answerBody}
                        </p>
                        <div id="votes">
                            <i aid="${res.id}" class="up far fa-thumbs-up"></i>
                            <span id="votes/${res.id}">
                                ${res.upvotes.length - res.downvotes.length}
                            </span>
                            <i aid="${res.id}" class="down far fa-thumbs-down"></i>
                        </div>

                    </div>
                </li>
            `)

            const l = $('.ul li').length
            $('.body').val('')
            $('.answersLength').text(`${l} Answers`)
        })


    })

    $('.up').click((e) => {
        const aid = e.target.getAttribute('aid')
        // console.log(e.target)
        $.get(`/answer/upvote/${aid}`, (res) => {
            if (res) {
                var span = document.getElementById(`votes/${aid}`)
                const downButton = $(`[aid='${aid}']`)
                span.innerText = res.upvotes.length - res.downvotes.length
                if (downButton[1].classList.contains('fas')) {
                    downButton[1].classList.remove('fas')
                    downButton[1].classList.add('far')
                }
                if (e.target.classList.contains("far")) {
                    e.target.classList.remove('far')
                    e.target.classList.add('fas')
                }
                else {
                    e.target.classList.remove('fas')
                    e.target.classList.add('far')
                }
            }
            else {
                location.href = '/auth/login'
            }

        })
    })

    $('.down').click((e) => {
        const aid = e.target.getAttribute('aid')
        console.log(e.target)
        $.get(`/answer/downvote/${aid}`, (res) => {
            if (res) {
                var span = document.getElementById(`votes/${aid}`)
                span.innerText = res.upvotes.length - res.downvotes.length
                const upButton = $(`[aid='${aid}']`)
                span.innerText = res.upvotes.length - res.downvotes.length
                if (upButton[0].classList.contains('fas')) {
                    upButton[0].classList.remove('fas')
                    upButton[0].classList.add('far')
                }
                if (e.target.classList.contains("far")) {
                    e.target.classList.remove('far')
                    e.target.classList.add('fas')
                }
                else {

                    e.target.classList.remove('fas')
                    e.target.classList.add('far')
                }
            }
            else {
                location.href = '/auth/login'
            }
        })
    })



})