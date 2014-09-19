class AddSalaryToListings < ActiveRecord::Migration
  def change
    add_column :listing, :salary_min, :integer
    add_column :listing, :salary_max, :integer
  end
end
