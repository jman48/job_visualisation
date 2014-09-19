class StatsController < ApplicationController
    
    def index
        @data = Array.new
        Language.uniq.pluck(:language).each do |lang|
            count = Language.where("language = ?", lang).sum(:count)
            @data.push([lang, count])
    	end
    end
    
    def language        
        @eachdata = Array.new
        Language.uniq.pluck(:language).each do |lang|
            query = Language.where("language = ?", lang)
            temp = Array.new
            query.each do |item|
                temp.push(item) 
            end
            @eachdata.push([lang, temp])
    	end
        
        @alldata = Array.new
        Language.uniq.pluck(:language).each do |lang|
            count = Language.where("language = ?", lang).sum(:count)
            @alldata.push([lang, count])
        end
        @count = 0;
        
        @langdata = Array.new
        lang = Language.where("language = ?", params[:lang])
        lang.each do |salary|
            @langdata.push(salary)
        end
    end  
    
    def seedata
        @data = Array.new
        tempdata = Language.where("language = ?", params[:lang]) 
        tempdata.each do |item|
            @data.push(item) 
        end
    end
    
    
end
