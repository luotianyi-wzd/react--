import { type } from './../action'

export default (state, action) => {
	if (!state) {
		return {menuName: '首页'}
	}
	switch(action.type){
		case type.SWITCH_MENU:
			return {
				...state,
				menuName:action.menuName
			}
		break;
		default:
			return {...state};
		break
	}
}
