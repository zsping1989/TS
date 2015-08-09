TS['link'] = TS['links']['uploadify'];
TS.addLink();
define(['jquery', 'fun', 'validate_cn','boot_time_cn', 'uploadify'], function (j, f, v, t, u) {
    var bind = {};

    bind.checkd = function () { /* 赋值选中 */
        var data = eval('window.' + TS.data_var + '.data');
        for (var i in data) {
            var obj = j('[name="' + i + '"]');
            if (obj.length) {
                obj.val([data[i]]);
            } else {
                j('[name="' + i + '\\[\\]"]').val([data[i]]);
            }
        }
    }


    bind.verify = function () { /* 表单验证 */
        j("#edit").validate({
            rules: {
                uname: {required: true}, password: {rangelength: [6, 18], required: true}, name: {minlength: 3, noNumber: true}, email: {email: true, required: true}            },
            messages: {
                uname: {"required": "true"}, password: {"rangelength": "[6,18]", "required": "true"}, name: {"minlength": "3", "noNumber": "true"}, email: {"email": "true", "required": "true"}            }});
    }


    f.onclick('#edit [type="submit"]:button', function () { /* 提交数据 */
        var $form = j("#edit");
        var $this = this;
        if ($form.valid()) {
            f.ajax($form.attr('action'), function (data) {
                if (data.status == 'info' && data.info == '添加成功') {
                    //$form.find('[type="reset"]:button').trigger('click');
                } else if (data.status == 'info') {
                    window.setTimeout(function () {
                        window.location.href = f.U('index');
                    }, 2000);
                }
                data.content = data.content || '';
                f.alt({status: data.status, statusTitle: data.statusTitle, content: '　' + data.content, close: 3});
            }, $this, $form.serialize(), 'post');
        }
        $this.data('click', 0);
        return false;
    }, 1);

    bind.upload = function () {
        j('.upload-img-box').find('input').each(function (i, item) {
            var $this = j(this);
            if (j.trim($this.val())) {
                var $img = $this.parents('.upload-img-box').show().find('img');
                $img.attr('src', $img.attr('url') + $this.val());
            }
        });
        j('#ts-img').uploadify({
            'swf': '/Public/tooljs/uploadify/uploadify.swf', //上传图片是post数据,必须用同域名路径
            'uploader': f.U('home/upload/img'),
            'height': 25,
            'width': 120,
            "buttonText": "上传图片",
            'formData': {
                'dir': j('#ts-img').siblings('.upload-img-box').find('input').attr('name'),
                'uid': eval('window.' + TS.data_var + '.id')
            },
            'fileTypeExts': '*.gif; *.jpg; *.png;*.bmp;*.jpeg',
            'debug': false,
            'onUploadSuccess': function (file, data) {
                eval('var data = ' + data);
                dumps(data);
                if (data.status != 'warming') {
                    var $img = j('#ts-img').siblings('.upload-img-box').show().find('img');
                    $img.attr('src', $img.attr('url') + data.pic + '?time=' + Math.random());
                    $img.siblings('input').val(data.pic);
                }
            },
            'onFallback': function () {
                f.alt({status: 'warning', statusTitle: '警告', content: '未检测到兼容版本的Flash.', close: 3});
            }
        });

    }


    function init() {
        for (var i in bind) {
            bind[i]();
        }
    }

    return {
        init: init
    };
});