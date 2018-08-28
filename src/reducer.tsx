import { Action } from 'redux';
import { PhotoFinderAppState } from './App';

const initialState: PhotoFinderAppState = {
  keyword: '',
  imageList: []
};

export default function reducer (state: PhotoFinderAppState = initialState, action: Action): PhotoFinderAppState {
  switch (action.type) {
    case 'UPDATE_KEYWORD':
      return state;
    default:
      return state;
  }
}
