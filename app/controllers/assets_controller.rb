class AssetsController < ApplicationController
  def index
    user = User.find(params[:user_id])
    @user_assets = user.assets

    symbols = @user_assets.symbols_as_str
    allocation_currencies = @user_assets.allocation_currencies_as_str

    @user_cmc_assets = cmc_assets(symbols)
    @cmc_allocation_currency_prices = cmc_assets(allocation_currencies)

    render json: form_assets
  end

  private

  # making http request for cmc data
  def cmc_assets(symbols)
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbols}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    return json_response["data"]
  end

  # forming assets with cmc data
  def form_assets
    # adding most cmc info
    partial_assets = @user_assets.map do |asset|
      asset_price = @user_cmc_assets[asset["symbol"]]["quote"]["USD"]["price"]
      allocation_currency_usd_price = asset["allocation_currency"] != "USD" ? @cmc_allocation_currency_prices[asset["allocation_currency"]]["quote"]["USD"]["price"] : 1
      asset_priced_in_allocation_currency = asset_price / allocation_currency_usd_price
      value = asset.quantity * asset_priced_in_allocation_currency
      value_change = value - asset.allocation
      percent_change = (value_change / asset.allocation) * 100
      percent_of_port = (asset.allocation / @user_assets.sum_of_allocations(asset.allocation_currency)) * 100
      cost_basis = asset.allocation / asset.quantity

      cmc_info = {
        :allocation_currency_usd_price => allocation_currency_usd_price,
        :price => asset_priced_in_allocation_currency,
        :value => value,
        :value_change => value_change,
        :percent_change => percent_change,
        :percent_of_port => percent_of_port,
        :cost_basis => cost_basis,
      }
      asset.attributes.merge(cmc_info)
    end

    # summing assets values
    sum_of_values = partial_assets.sum { |asset| asset[:value] }

    #forming complete assets
    formed_assets = partial_assets.map do |asset|
      percent_of_curr_port = (asset["allocation"] / sum_of_values) * 100
      asset.merge({ :percent_of_curr_port => percent_of_curr_port })
    end

    return formed_assets
  end
end
