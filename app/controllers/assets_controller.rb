class AssetsController < ApplicationController
  before_action :set_users_assets, only: [:index]
  before_action :set_users_asset, only: [:update]

  # GET /users/:user_id/assets
  def index
    symbols = @user_assets.symbols_as_str
    allocation_currencies = @user_assets.allocation_currencies_as_str

    @user_cmc_assets = cmc_assets(symbols)
    @cmc_allocation_currency_prices = cmc_assets(allocation_currencies)

    render json: form_assets
  end

  # PUT /users/:user_id/assets/:id
  def update
    if @user_asset.update(asset_params)
      symbol = @user_asset.symbol
      allocation_currency = @user_asset.allocation_currency
      @user_cmc_assets = cmc_assets(symbol)
      @cmc_allocation_currency_prices = allocation_currency != 'USD' ? cmc_assets(allocation_currency) : nil

      asset = form_one_asset(@user_asset)
      render json: add_to_formed_asset(asset)
    end
  end

  private

  # SETTERS
  def set_users_assets
    user = User.find(params[:user_id])
    @user_assets = user.assets
  end

  def set_users_asset
    @user_asset = set_users_assets.find(params[:id])
  end

  def asset_params
    params.require(:asset).permit(:allocation, :quantity)
  end

  # making http request for cmc data
  def cmc_assets(symbols)
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbols}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    return json_response["data"]
  end

  # FORM USER'S ASSETS
  def form_assets
    @partially_formed_assets = @user_assets.map { |asset| form_one_asset(asset) }

    formed_assets = @partially_formed_assets.map { |asset| add_to_formed_asset(asset) }

    return formed_assets
  end

  # FORM ONE ASSET pt. 1
  def form_one_asset(asset)
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

  # SUM VALUES OF ALLOCATION CURRENCY
  def sum_of_values(current_asset)
    filtered_assets = @partially_formed_assets.filter { |asset| asset["allocation_currency"] == current_asset["allocation_currency"] }
    filtered_assets.sum { |asset| asset[:value] }
  end

  # FORM ONE ASSET pt. 2
  def add_to_formed_asset(asset)
    percent_of_curr_port = (asset[:value] / sum_of_values(asset)) * 100
    asset.merge({ :percent_of_curr_port => percent_of_curr_port })
  end
end
