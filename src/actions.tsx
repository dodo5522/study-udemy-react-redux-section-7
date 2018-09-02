import { Action } from 'redux';

const ACTION_PREFIX = '@@photoFinderApp';

export interface UpdateKeywordAction extends Action<String> {
  type: String;
  keyword: String;
}

export const UPDATE_KEYWORD = `${ACTION_PREFIX}/UPDATE_KEYWORD`;
export const updateKeyword = (keyword: String): UpdateKeywordAction => {
  return {
    type: UPDATE_KEYWORD,
    keyword
  };
};
