class Asset < ApplicationRecord
  belongs_to :user

  def self.sum_of_allocations curr
    where(allocation_currency: curr).pluck(:allocation).sum
  end

  def self.symbols_as_str
    pluck(:symbol).join(",")
  end

  def self.allocation_currencies_as_str
    where.not(allocation_currency: "USD").pluck(:allocation_currency).uniq.join(",")
  end


end
