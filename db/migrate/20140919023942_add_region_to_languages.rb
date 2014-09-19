javascript:void(0)class AddRegionToLanguages < ActiveRecord::Migration
  def change
    add_column :languages, :region, :string
  end
end
