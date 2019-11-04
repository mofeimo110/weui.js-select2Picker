(() => {
    if (!weui || !$)
        return;
    weui.select2Picker = {
        init: () => {
            weui.select2Picker.initSelectChange();
            weui.select2Picker.initPcikerClick();
        },
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
        showPicker: (dom, values) => {
            weui.picker(values, {
                id: new Date().valueOf(),
                defaultValue: weui.select2Picker.getSelectValue(dom),
                onConfirm: function (result) {
                    const val = result[result.length - 1].value;
                    weui.select2Picker.setValue(dom, val);
                }
            });
        },
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
        getSelectValue: dom => {
            const $this = $(dom);
            const val = $this.val();
            const choose = [];
            if (!val) {
                return choose;
            }
            if ($this.find(':checked').data('categoryid')) {
                choose.push($this.find(':checked').data('categoryid'));
            }
            choose.push(val);
            return choose;
        },
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
