# H

## Testing

### Corner Factory

```ruby
FactoryBot.define do
  factory :corner do
    name { "ocean" }
    velocity { 20.0 }
  end
end

```

### Request spec

```ruby
RSpec.describe "Corners", type: :request do
  describe "GET /index" do
    let(:corner) { create(:corner) }

    it 'returns a 200 response' do
      get corner_path(corner)
      expect(response).to have_http_status(200)
    end
  end
end

```
### Test Result

![](test_success.png)