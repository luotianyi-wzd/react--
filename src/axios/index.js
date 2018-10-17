import JsonP from 'jsonp'
import axios from 'axios'
import Utils from './../utils/utils'
import { message } from 'antd'
export default class Axios {
	static jsonp(opts) {
		return new Promise((resolve, reject) => {
			JsonP(opts.url, {
				param: 'callback'
			},function (err, response) {
				if (response.status == 'success') {
					resolve(response)
				} else {
					reject(response.message)
				}
			})
		})
	}
	static requestList(_this, url, params, isMock) {
        let data = {
            params: params
        }
        this.ajax({
            url,
            data,
            isMock
        }).then((res) => {
            if (res && res.result) {
            	if (!res.result.item_list) {
            		res.result.item_list = res.result.list
            	}
                let list = res.result.item_list.map((item, index) => {
                    item.key = index
                    return item
                })
                _this.setState({
                    dataSource: list,
                    selectedRowKeys: null,
        			selectedItem:null,
                    pagination: Utils.pagination(res, (current) => {
                      _this.params.page = current
                      _this.request()
                    })
                })
            }
        })
    }
	static ajax(opts) {
		let baseUrl = ''
		// if (opts.isMock) {
		// 	baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
		// } else {
		// 	baseUrl = ''
		// }
		baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
		return new Promise((resolve, reject) => {
			axios({
				url: baseUrl + opts.url,
				method: 'get',
				// timeout: 10000,
				params: (opts.data && opts.data.params || '')
			}).then((res) => {
				if (res.status == 200) {
					if (res.data.code == '0') {
						resolve(res.data)
						// message.success('调用成功')
					} else {
						message.error(res.data.msg)
					}
				} else {
					reject(res.msg)
				}
			})
		})
	}
}