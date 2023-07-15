const initialState = {
  profilePhotoUrl: `${process.env.PUBLIC_URL}/assets/images/ellie.png` // URL de la foto de perfil actual
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PROFILE_PHOTO':
      return {
        ...state,
        profilePhotoUrl: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
