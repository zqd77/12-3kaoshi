$(function() {
    $('.top').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })
})