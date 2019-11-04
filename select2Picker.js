(() => {
    if (!weui || !$)
        return;
    weui.select2Picker = {
        init: () => {
            weui.select2Picker.initSelectChange();
            weui.select2Picker.initPcikerClick();
        },
        // 给select控件注册事件，改变时修改显示的值
        initSelectChange: () => {
            const pickerDoms = $('[pickerfrom]');
            $.each(pickerDoms, (i, dom) => {
                const target = $(dom).attr('pickerfrom');
                $('body').on('change', target, (e) => {
                    const $this = $(e.target);
                    if ($this.val()) {
                        weui.select2Picker.setValue($(`[pickerfrom="${target}"]`), $this.find(':checked').text());
                    }
                });
            });
        },
        // 给显示控件注册点击事件，点击时生成picker的options，如果控件存在pickerdisabled类，则停止工作
        initPcikerClick: () => {
            $('[pickerfrom]').on('click', (e) => {
                if ($(e.target).hasClass('pickerdisabled')) {
                    return;
                }
                const dom = $(e.target).attr('pickerfrom');
                let values = weui.select2Picker.initPickerOptions(dom);
                values = weui.select2Picker.uniqueOptions(values);
                weui.select2Picker.showPicker(dom, values);
            });
        },
        // 显示picker
        showPicker: (dom, items, options) => {
            weui.picker(items, $.extend({
                id: new Date().valueOf(),
                defaultValue: weui.select2Picker.getSelectValue(dom),
                onConfirm: function (result) {
                    const val = result[result.length - 1].value;
                    weui.select2Picker.setValue(dom, val);
                }
            }, options));
        },
        // picker的items去重
        uniqueOptions: values => {
            const newArr = [];
            values.forEach(x => {
                const exists = newArr.find(y => { return y.value == x.value });
                if (exists) {
                    if (x.children && x.children.length > 0) {
                        if (!exists.children) {
                            exists.children = [];
                        }
                        x.children.forEach(child => {
                            exists.children.push(child);
                        });
                    }
                } else {
                    newArr.push(x);
                }
            });
            return newArr;
        },
        // 创建pickeritems，如果存在optgroup则生成两级item
        initPickerOptions: dom => {
            const $select = $(dom);
            let pickerOptions = [];
            if ($select.find('optgroup').length > 0) {
                const $optgroup = $select.find('optgroup');
                $.each($optgroup, (i, $group) => {
                    const $option = $($group).find('option:first');
                    if ($option.data('categoryid')) {
                        pickerOptions.push({
                            value: $($option).data('categoryid'),
                            label: $($group).attr('label'),
                            children: weui.select2Picker.option2Picker($group)
                        });
                    }
                });
            } else {
                pickerOptions = weui.select2Picker.option2Picker($select);
            }
            return pickerOptions;
        },
        // 将option生成为item，如果有disabled则设置对应属性
        option2Picker: parent => {
            const $option = $(parent).find('option');
            const hadArr = [];
            $.each($option, (i, $opt) => {
                if ($($opt).val()) {
                    hadArr.push({
                        value: $($opt).val(),
                        label: $($opt).text(),
                        disabled: $($opt).prop('disabled')
                    });
                }
            });
            return hadArr;
        },
        // 获取select当前的值，用作picker的默认值
        getSelectValue: dom => {
            const $this = $(dom);
            const val = $this.val();
            const choose = [];
            if (!val) {
                return choose;
            }
            if ($this.find(':checked').parent().attr('label')) {
                choose.push($this.find(':checked').parent().attr('label'));
            }
            choose.push(val);
            return choose;
        },
        // 给select赋值并且触发change事件
        setValue: (target, val) => {
            const $dom = $(target);
            if ($dom.is('select') || $dom.is('input')) {
                $dom.val(val);
            } else {
                $dom.text(val);
            }
            $dom.trigger("change");
        }
    }
})();
