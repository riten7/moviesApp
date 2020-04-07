import React from "react";
import { shallow, mount } from "enzyme";
import ConfirmationPopup from "../ConfirmationPopup";

describe("Component renders properly", () => {
  const handleDeleteMovie = jest.fn();
  const closePopup = jest.fn();
  it("Test Confirm Popup Component works", () => {
    const wrapper = mount(<ConfirmationPopup title='test title'
        closePopup={closePopup}
        handleDeleteMovie={handleDeleteMovie}/>);
    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.find('.ant-modal-body').text()).toEqual('Are you sure you want to delete test title ?');

    wrapper.find('.ant-btn.ant-btn-primary').simulate('click');
    expect(handleDeleteMovie).toHaveBeenCalled();

    wrapper.find('.ant-btn').at(0).simulate('click');
    expect(closePopup).toHaveBeenCalled();
  });
});