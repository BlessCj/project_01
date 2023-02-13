$(function() {
        // 初始化右侧滚动条
        // 这个方法定义在scroll.js中
        resetui()
        $('#btnSend').on('click', function() {
            let val = $('#ipt').val().trim()
            if (val.length <= 0) {
                return $('#ipt').val('')
            }
            $('.talk_list').append(`<li class="right_word">
        <img src="img/person02.png" /> <span>${val}</span>
    </li>`)
            $('#ipt').val('')
            resetui()
            getMsg(val)
        })
    })
    // 获取信息
function getMsg(text) {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/robot',
        data: {
            spoken: text
        },
        success: function(res) {
            let msg = res.data.info.text
            if (res.message === 'success') {
                $('.talk_list').append(`<li class="left_word">
        <img src="img/person01.png" /> <span>${msg}</span>
    </li>`)
                resetui()
                getVoice(msg)
            }
        }
    })
}
// 文字转语言
function getVoice(text) {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/synthesize',
        data: {
            text: text
        },
        success: function(res) {
            console.log(res);
            if (res.status === 200) {
                // 文字转语音
                $('#voice').attr('src', res.voiceUrl)
            }
        }
    })
}
$('#ipt').on('keyup', function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 13)
            $('#btnSend').click()
    })
    // http://www.liulongbin.top:3006/api/robot
    // http://www.liulongbin.top:3006/api/synthesize