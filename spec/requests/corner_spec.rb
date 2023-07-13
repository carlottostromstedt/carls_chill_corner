require 'rails_helper'

RSpec.describe "Corners", type: :request do
  describe "GET /index" do
    let(:corner) { create(:corner) }

    it 'returns a 200 response' do
      get corner_path(corner)
      expect(response).to have_http_status(200)
    end
  end
end
