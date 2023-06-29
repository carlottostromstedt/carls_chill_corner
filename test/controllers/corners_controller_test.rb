require "test_helper"

class CornersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @corner = corners(:one)
  end

  test "should get index" do
    get corners_url
    assert_response :success
  end

  test "should get new" do
    get new_corner_url
    assert_response :success
  end

  test "should create corner" do
    assert_difference("Corner.count") do
      post corners_url, params: { corner: { name: @corner.name, velocity: @corner.velocity } }
    end

    assert_redirected_to corner_url(Corner.last)
  end

  test "should show corner" do
    get corner_url(@corner)
    assert_response :success
  end

  test "should get edit" do
    get edit_corner_url(@corner)
    assert_response :success
  end

  test "should update corner" do
    patch corner_url(@corner), params: { corner: { name: @corner.name, velocity: @corner.velocity } }
    assert_redirected_to corner_url(@corner)
  end

  test "should destroy corner" do
    assert_difference("Corner.count", -1) do
      delete corner_url(@corner)
    end

    assert_redirected_to corners_url
  end
end
