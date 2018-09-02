import { Reducer } from 'redux';
import { PhotoFinderAppState } from './App';
import { UPDATE_KEYWORD, UpdateKeywordAction } from './actions';

const initialState: PhotoFinderAppState = {
  keyword: '',
  imageList: []
};

export const reducer: Reducer<PhotoFinderAppState, UpdateKeywordAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KEYWORD:
      return {
        keyword: action.keyword,
        imageList: state.imageList
      };
    default:
      return state;
  }
};
