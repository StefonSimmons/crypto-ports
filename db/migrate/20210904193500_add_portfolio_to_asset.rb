class AddPortfolioToAsset < ActiveRecord::Migration[6.1]
  def change
    add_reference :assets, :portfolio, null: false, foreign_key: true
  end
end
