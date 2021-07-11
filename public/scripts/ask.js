$(() => {
    $('#submit').click((event) => {
        event.preventDefault()
        const question = $('#question').val()
        $.post('/query/ask', {
            body: question
        }, (response) => {
            if (response) {
                new Noty({
                    text: `Your questions posted successfully
                            Check in your profile`,
                    type: 'success',
                    layout: 'topCenter',
                    theme: 'mint',
                    closeWith: ['click', 'button'],
                    timeout: 1000
                }).show()
                setTimeout(() => {
                    location.href = '/'
                }, 1010)

            }
        })

    })
})