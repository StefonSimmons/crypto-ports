class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :assets, dependent: :destroy

  def total_allocation
    assets.pluck("allocation").sum
  end
end
