$(function() {
    $('.list').on('click', 'dl', function() {
        $(this).addClass('bg').siblings().removeClass('bg')
    })
})