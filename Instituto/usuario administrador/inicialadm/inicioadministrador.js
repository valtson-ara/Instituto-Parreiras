

$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('#mobile_menu, #mobile_btn').length) {
            $('#mobile_menu').removeClass('active');
        }
    });

    $('.profile-header').on('click', function() {
        $('.profile-dropdown').toggleClass('active');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.profile-dropdown').length) {
            $('.profile-dropdown').removeClass('active');
        }
    });

    $('.link-branco').on('click', function(e) {
        e.preventDefault();
        $('#profile-options-modal').fadeIn(300);
    });

    $(document).on('click', function(e) {
        if ($(e.target).hasClass('profile-options-modal')) {
            $('#profile-options-modal').fadeOut(300);
        }
    });
});


document.getElementById('sair').addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: 'include',
    })
})