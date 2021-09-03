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

  def index
    assets = Asset.all
    render json: assets.to_json(methods: :cmc_asset) #making http request in model
  end


end
