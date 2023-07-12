import { getMembersPending, getMembersError, getMembersSuccess } from './actions';
import { getMemberByIdPending, getMemberByIdError, getMemberByIdSuccess } from './actions';
import { addMemberPending, addMemberError, addMemberSuccess } from './actions';
import { putMemberPending, putMemberError, putMemberSuccess } from './actions';
import { delMemberPending, delMemberError, delMemberSuccess } from './actions';

export const getMembers = () => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'GET',
        headers: { token: token }
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      data.data.forEach((item) => {
        item.birthDate = item.birthDate.substring(0, 10);
      });

      dispatch(getMembersSuccess(data.data));
    } catch (error) {
      dispatch(getMembersError(error));
    }
  };
};

export const getMemberById = (id) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(getMemberByIdPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'GET',
        headers: { token: token }
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      dispatch(getMemberByIdSuccess(data.data));
    } catch (error) {
      dispatch(getMemberByIdError(error));
    }
  };
};

export const addMember = (member, switchModal) => {
  return async (dispatch) => {
    try {
      dispatch(addMemberPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      });
      const newMemb = await response.json();
      console.log(member);
      if (newMemb.error) {
        switchModal(newMemb.error, newMemb.message);
        throw new Error(newMemb.message);
      }
      switchModal(false, newMemb.message);
      dispatch(addMemberSuccess());
    } catch (error) {
      dispatch(addMemberError(error));
    }
  };
};

export const putMember = (id, member, switchModal) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(putMemberPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          phone: member.phone,
          email: member.email,
          city: member.city,
          birthDate: member.birthDate,
          postalCode: member.postalCode,
          memberships: member.memberships,
          password: member.password
        })
      });
      const data = await response.json();
      if (data.error) {
        switchModal(data.error, data.message);
        throw new Error(data.message);
      }
      switchModal(data.error, data.message);
      dispatch(putMemberSuccess());
    } catch (error) {
      dispatch(putMemberError(error));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      dispatch(delMemberPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      dispatch(delMemberSuccess());
    } catch (error) {
      dispatch(delMemberError(error));
    }
  };
};
