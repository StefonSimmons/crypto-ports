class AssetsController < ApplicationController
  #  # GET /baskets/:id
  #  def show
  #   render json: @basket.to_json(
  #     :include => {
  #       :line_items => {
  #         :include => :dish,
  #         :methods => :subtotal
  #       },
  #     },
  #     :methods => :total
  #   )
  # end

  def user_assets
    user = User.find(params[:id])
    assets = user.assets

    symbols_as_str = assets.pluck(:symbol).join(",")
    allocation_currencies_as_str = assets.where.not(allocation_currency: "USD").pluck(:allocation_currency).uniq.join(",")

    user_cmc_assets = cmc_assets(symbols_as_str)
    cmc_allocation_currency_prices = cmc_assets(allocation_currencies_as_str)

    full_assets = assets.map do |asset|
      asset_price = user_cmc_assets[asset["symbol"]]["quote"]["USD"]["price"]
      allocation_currency_usd_price = asset["allocation_currency"] != "USD" ? cmc_allocation_currency_prices[asset["allocation_currency"]]["quote"]["USD"]["price"] : 1
      asset_priced_in_allocation_currency = asset_price / allocation_currency_usd_price
      value = asset.quantity * asset_priced_in_allocation_currency
      value_change = value - asset.allocation
      cmc_info = {
        :allocation_currency_usd_price => allocation_currency_usd_price,
        :price => asset_price / allocation_currency_usd_price,
        :value => value,
        :value_change => value_change,
        :percent_change => (value_change / asset.allocation) * 100,
        :percent_of_port => (asset.allocation / assets.sum_of_allocations(asset.allocation_currency)) * 100,
        :cost_basis => asset.allocation / asset.quantity,
      }
      asset.attributes.merge(cmc_info)
    end

    sum_of_values = full_assets.sum do |asset|
      asset[:value]
    end

    formed_assets = full_assets.map do |asset|
      new_hash = {:percent_of_curr_port => (asset['allocation']/sum_of_values) * 100}
      asset.merge(new_hash)
    end

    render json: formed_assets

    # render json: assets.to_json(methods: [:allocation_currency_price, :cmc_asset])
  end

  # making http request
  def cmc_assets(symbols)
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbols}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    return json_response["data"]
  end
end
